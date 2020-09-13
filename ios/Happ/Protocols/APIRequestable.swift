//
//  APIRequestable.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

protocol APIRequestable: class {
    
    var tokens: Tokens? { get }
    
    func clearTokens()
    
    func cancelDownload(for endpoint: Routable)
    
    func signIn(data: SignInData, onSuccess: @escaping () -> Void, onError: @escaping (Error) -> Void)
    
}
