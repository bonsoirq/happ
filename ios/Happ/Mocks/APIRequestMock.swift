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

    func signUp(data: SignUpData) -> Requestable {
        RequestMock(responseData: nil)
    }

    // MARK: Happenings

    func happenings(_ endpoint: Endpoint.Happenings) -> Requestable {
        RequestMock(responseData: [MockData.happening])
    }

    func happeningImage(id: String) -> URL? {
        URL(string: "")
    }

    // MARK: Account

    func account(_ endpoint: Endpoint.Account) -> Requestable {
        RequestMock(responseData: MockData.accountDetails)
    }
    
}

