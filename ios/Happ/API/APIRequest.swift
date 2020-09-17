//
//  APIRequest.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

final class APIRequest: APIRequestable {
    
    // MARK: Properties
    
    private var apiUrl: URL {
        return URL(string: "http://jbak.hopto.org:8080/")!
    }
    
    private let tokensKey = "Tokens"
    
    private(set) var tokens: Tokens? {
        get {
            guard let data = UserDefaults.standard.value(forKey: tokensKey) as? Data else { return nil }
            return try? PropertyListDecoder().decode(Tokens.self, from: data)
        }
        set {
            if let data = try? PropertyListEncoder().encode(newValue) {
                UserDefaults.standard.set(data, forKey: tokensKey)
            } else {
                UserDefaults.standard.removeObject(forKey: tokensKey)
            }
        }
    }

    private var requests = [Route : Requestable]()
    
    // MARK: Methods
    
    func clearTokens() {
        tokens = nil
    }
    
    private func createRequest(for endpoint: Endpointable, forceQueryItemsUse: Bool = false, shouldRefreshToken: Bool = false) -> Requestable {
        let request = Request(url: apiUrl, endpoint: endpoint, tokens: tokens, forceQueryItemsUse: forceQueryItemsUse, shouldRefreshToken: shouldRefreshToken)
        return request
    }
    
    func cancelDownload(for endpoint: Routable) {
        requests[endpoint.route]?.cancel()
        requests[endpoint.route] = nil
    }
    
    // MARK: General
    
    func signIn(data: SignInData, onSuccess: @escaping () -> Void, onError: @escaping (Error) -> Void) {
        let endpoint = Endpoint.signIn(data: data)
        requests[endpoint.route] = createRequest(for: endpoint)
            .dataAtRoot()
            .onError(onError)
            .onDataSuccess { [weak self] (tokens: Tokens?) in
                self?.tokens = tokens
                self?.requests[endpoint.route] = nil
                onSuccess()
            }
        requests[endpoint.route]?.make()
    }

    // MARK: Account

    func account(_ endpoint: Endpoint.Account) -> Requestable {
        requests[endpoint.route] = createRequest(for: endpoint)
        return requests[endpoint.route]!
    }
    
}
