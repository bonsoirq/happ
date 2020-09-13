//
//  ResponseErrorable.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

protocol ResponseErrorable {
    func error(statusCode: Int, errorContent: String?) -> ResponseError
    func defaultError(statusCode: Int, errorContent: String?) -> ResponseError
}

extension ResponseErrorable {
    func error(statusCode: Int, errorContent: String?) -> ResponseError {
        if statusCode == 401 {
            return .accessTokenExpired
        }
        return defaultError(statusCode: statusCode, errorContent: errorContent)
    }
    
    func defaultError(statusCode: Int, errorContent: String?) -> ResponseError {
        if let content = errorContent {
            return .other(content: content)
        }
        return .somethingHappened(errorCode: statusCode)
    }
}
