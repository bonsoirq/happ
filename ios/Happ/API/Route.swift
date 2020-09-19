//
//  Route.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

struct Route: Hashable {
    
    let path: String
    let method: HTTPMethod
    let headers: [String : String]
    let parameters: [String : AnyHashable]
    
    init(path: String, method: HTTPMethod, headers: [String : String] = [:], parameters: [String : AnyHashable] = [:]) {
        self.path = path
        self.method = method
        self.headers = headers
        self.parameters = parameters
    }
    
}
