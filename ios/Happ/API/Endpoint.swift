//
//  Endpoint.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

typealias Endpointable = (Routable&ResponseErrorable)

enum Endpoint: Endpointable {

    enum Happenings: Endpointable {
        case get
        case create(data: HappeningData)
        case delete(id: String)

        var route: Route {
            switch self {
            case .get:
                return Route(path: "happenings/", method: .get)
            case .create(let data):
                return Route(path: "happenings/", method: .post, parameters: data.dictionary)
            case .delete(let id):
                return Route(path: "happenings/\(id)/", method: .delete)
            }
        }
    }

    enum Account: Endpointable {
        case details

        var route: Route {
            switch self {
            case .details:
                return Route(path: "accounts/my/", method: .get)
            }
        }
    }
    
    case signIn(data: SignInData)
    
    var route: Route {
        switch self {
        case .signIn(let data):
            return Route(path: "sessions/", method: .post, parameters: data.dictionary)
        }
    }
    
    func error(statusCode: Int, errorContent: String?) -> ResponseError {
        switch (self, statusCode) {
        case (_, 403):
            return .accessTokenExpired
        default:
            return defaultError(statusCode: statusCode, errorContent: errorContent)
        }
    }
    
}
