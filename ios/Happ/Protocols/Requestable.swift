//
//  Requestable.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

protocol Requestable {
    
    // MARK: Initialization
    
    init(url: URL, endpoint: Endpointable, tokens: Tokens?, forceQueryItemsUse: Bool, shouldRefreshToken: Bool)
    
    // MARK: Methods

    func dataAtRoot() -> Self
    func onSuccess(_ callback: @escaping () -> Void) -> Self
    func onDataSuccess<RD: ResponseData>(_ callback: @escaping (RD?) -> Void) -> Self
    func onError(_ callback: @escaping (Error) -> Void) -> Self
    func replaceTokens(_ tokens: Tokens?) -> Self
    
    func make()
    func cancel()
    
}
