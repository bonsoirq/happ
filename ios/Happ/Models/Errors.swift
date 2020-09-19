//
//  Errors.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation
import SwiftUI

struct IdentifableError: Identifiable {
    var id: String { error.localizedDescription }
    var accessTokenExpired: Bool { error.accessTokenExpired }
    private var error: Error
    
    var localized: String { error.localizedDescription }
    
    init(_ error: Error) {
        self.error = error
    }
}

enum ResponseError: Error, LocalizedError, Equatable {
    case other(content: String)
    case somethingHappened(errorCode: Int)
    case accessTokenExpired
    
    var errorDescription: String? {
        switch self {
        case .other(let content):
            return content
        case .somethingHappened(let errorCode):
            return "\(Translation.Error.default.localized) (\(errorCode))"
        case .accessTokenExpired:
            return Translation.Error.accessTokenExpired.localized
        }
    }
}
