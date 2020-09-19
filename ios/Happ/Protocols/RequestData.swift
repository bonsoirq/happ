//
//  RequestData.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

protocol RequestData: Codable {
    var dictionary: [String : AnyHashable] { get }
}
