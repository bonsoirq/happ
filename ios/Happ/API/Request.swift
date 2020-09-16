//
//  Request.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

final class Request: Requestable {

    private struct Response<T: Codable>: Codable {
        let data: T
    }
    
    // MARK: Properties
    
    private var endpoint: Endpointable
    private var request: URLRequest
    private var task: URLSessionTask?
    var canRefreshToken: Bool = true
    
    private var tokenExpiredCallback: (() -> Void)? = nil
    private var successCallback: (() -> Void)? = nil
    private var dataSuccessCallback: ((Data?) -> Void)? = nil
    private var errorCallback: ((Error) -> Void)? = nil
    
    // MARK: Initialization
    
    init(url: URL, endpoint: Endpointable, tokens: Tokens?, forceQueryItemsUse: Bool, shouldRefreshToken: Bool) {
        guard endpoint.route.path.last == "/" else { fatalError("Endpoint path must end with '/'") }
        self.endpoint = endpoint
        
        let method = endpoint.route.method
        let parameters = endpoint.route.parameters
        
        var headers = endpoint.route.headers
        headers["Content-Type"] = "application/json"
        
        if shouldRefreshToken, let refreshToken = tokens?.refresh {
            headers["Authorization"] = "Bearer \(refreshToken)"
        } else if let authToken = tokens?.auth {
            headers["Authorization"] = "Bearer \(authToken)"
        }
        
        let urlString = "\(url)\(endpoint.route.path)"
        var urlComponents = URLComponents(string: urlString)
        
        if (method == .get || forceQueryItemsUse) && parameters.count > 0 {
            urlComponents?.queryItems = parameters.map { URLQueryItem(name: $0.key, value: "\($0.value)") }
        }
        
        guard let url = urlComponents?.url else { fatalError("Invalid URL") }
        
        request = URLRequest(url: url)
        request.httpMethod = method.rawValue
        request.allHTTPHeaderFields = headers
        
        if method != .get && !forceQueryItemsUse  {
            request.httpBody = try? JSONSerialization.data(withJSONObject: parameters, options: [])
        }
        
        print(url.absoluteString)
        print(method.rawValue)
        print(headers)
        print(parameters)
    }
    
    // MARK: Methods
    
    @discardableResult
    func onTokenExpired(_ callback: @escaping () -> Void) -> Self {
        tokenExpiredCallback = callback
        return self
    }
    
    func onSuccess(_ callback: @escaping () -> Void) -> Self {
        successCallback = callback
        return self
    }
    
    func onDataSuccess<RD: ResponseData>(_ callback: @escaping (RD?) -> Void) -> Self {
        dataSuccessCallback = { [weak self] data in
            guard let data = data else {
                DispatchQueue.main.async {
                    callback(nil)
                }
                self?.task = nil
                return
            }
            do {
                if RD.self == String.self {
                    let responseData = String(data: data, encoding: .utf8) as? RD
                    DispatchQueue.main.async {
                        callback(responseData)
                    }
                } else {
                    let decoder = JSONDecoder()
                    decoder.dateDecodingStrategy = .formatted(FullDateFormatter())
                    decoder.keyDecodingStrategy = .convertFromSnakeCase
                    
                    let responseData = try decoder.decode(Response<RD>.self, from: data).data
                    DispatchQueue.main.async {
                        callback(responseData)
                    }
                }
            }
            catch {
                print(error)
                DispatchQueue.main.async { [weak self] in
                    self?.errorCallback?(error)
                }
            }
        }
        return self
    }
    
    func onError(_ callback: @escaping (Error) -> Void) -> Self {
        errorCallback = callback
        return self
    }
    
    func replaceTokens(_ tokens: Tokens?) -> Self {
        tokenExpiredCallback = nil
        if let authToken = tokens?.auth {
            request.allHTTPHeaderFields?["Authorization"] = "Bearer \(authToken)"
        }
        return self
    }
    
    func make() {
        task = URLSession.shared.dataTask(with: request) { [weak self] (data, response, error) in
            data?.printResponse()
            print(error as Any)
            let error = response?.error(for: self?.endpoint, responseData: data) ?? error
            
            DispatchQueue.main.async { [weak self] in
                if let error = error {
                    if error.accessTokenExpired && self?.canRefreshToken == true && self?.tokenExpiredCallback != nil {
                        self?.tokenExpiredCallback?()
                    } else {
                        self?.errorCallback?(error)
                    }
                } else if let successCallback = self?.successCallback {
                    successCallback()
                } else {
                    self?.dataSuccessCallback?(data)
                }
            }
            
            self?.task = nil
        }
        
        task?.resume()
    }
    
    func cancel() {
        task?.cancel()
        task = nil
    }
    
}

private extension Data {
    func printResponse() {
        if let json = try? JSONSerialization.jsonObject(with: self, options: []) {
            print(json)
        } else {
            let responseText = String(data: self, encoding: .utf8) ?? "No response"
            print(responseText)
        }
    }
}

private extension URLResponse {
    func error(for endpoint: Endpointable?, responseData: Data?) -> ResponseError? {
        guard let statusCode = (self as? HTTPURLResponse)?.statusCode, !(200..<300 ~= statusCode) else { return nil }
        if let data = responseData, let decodedError = try? JSONDecoder().decode(DecodedError.self, from: data) {
            return endpoint?.error(statusCode: statusCode, errorContent: decodedError.error)
        }
        return endpoint?.error(statusCode: statusCode, errorContent: nil)
    }
}
