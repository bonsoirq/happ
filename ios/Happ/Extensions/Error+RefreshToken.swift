//
//  Error+RefreshToken.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

extension Error {
    
    var accessTokenExpired: Bool {
        (self as? ResponseError) == .accessTokenExpired
    }
    
}
