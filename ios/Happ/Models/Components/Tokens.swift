//
//  Tokens.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

struct Tokens: ResponseData {
    let auth: String
    let refresh: String?
    
    enum CodingKeys: String, CodingKey {
        case auth = "authToken"
        case refresh = "refreshToken"
    }
}
