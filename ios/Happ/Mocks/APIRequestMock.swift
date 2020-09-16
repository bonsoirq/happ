//
//  APIRequestMock.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

final class APIRequestMock: APIRequestable {
    
    // MARK: Properties
    
    private(set) var tokens: Tokens?
    
    // MARK: Methods
    
    func clearTokens() {
        tokens = nil
    }
    
    func cancelDownload(for endpoint: Routable) { }
    
    // MARK: General
    
    func signIn(data: SignInData, onSuccess: @escaping () -> Void, onError: @escaping (Error) -> Void) {
        tokens = MockData.tokens
        DispatchQueue.main.async {
            onSuccess()
        }
    }
    
}

