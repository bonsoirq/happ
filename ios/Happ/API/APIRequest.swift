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

    private var downloadRequests = [Route : Requestable]()
    private var signInRequest: Requestable?
    
    // MARK: Methods
    
    func clearTokens() {
        tokens = nil
    }
    
    private func createRequest(for endpoint: Endpointable, forceQueryItemsUse: Bool = false, shouldRefreshToken: Bool = false) -> Requestable {
        let request = Request(url: apiUrl, endpoint: endpoint, tokens: tokens, forceQueryItemsUse: forceQueryItemsUse, shouldRefreshToken: shouldRefreshToken)
        return request
    }
    
    func cancelDownload(for endpoint: Routable) {
        downloadRequests[endpoint.route]?.cancel()
        downloadRequests[endpoint.route] = nil
    }
    
    // MARK: General
    
    func signIn(data: SignInData, onSuccess: @escaping () -> Void, onError: @escaping (Error) -> Void) {
        signInRequest = createRequest(for: Endpoint.signIn(data: data))
            .onError(onError)
            .onDataSuccess { [weak self] (tokens: Tokens?) in
                self?.tokens = tokens
                self?.signInRequest = nil
                onSuccess()
            }
        signInRequest?.make()
    }

    func signOut() -> Requestable {
        createRequest(for: Endpoint.signOut)
    }
    
}
