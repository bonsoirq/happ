//
//  Happening.swift
//  Happ
//
//  Created by Maksymilian Galas on 17/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

struct Happening: ResponseData, Identifiable, Hashable {
    let id: String
    let name: String
    let accountId: String
    let description: String
    let organizerDescription: String
    let agenda: String
    let isPublished: Bool
}
