//
//  RawRepresentable+Localized.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

extension RawRepresentable where RawValue == String {
    
    var localized: String {
        rawValue.localized
    }
    
}
