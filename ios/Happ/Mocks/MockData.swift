//
//  MockData.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

enum MockData {
    
    // MARK: Tokens
    
    static let tokens = Tokens(auth: "token", refresh: "refreshToken")

    // MARK: Account

    static let accountDetails = AccountDetails(id: "1", name: "John Appleseed", email: "john@apple.com")

    // MARK: Happening

    static let happening = Happening(id: "1", name: "Test", accountId: "1", description: "fd fd dfdgb gf f  f f f df", organizerDescription: "vc vkjdfj dkkjdfdjfjkfkjdkj df", agenda: "dfkfmvfdkvkmdfkl", isPublished: true)
    
}
