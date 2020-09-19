//
//  AccountDetails.swift
//  Happ
//
//  Created by Maksymilian Galas on 16/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

struct AccountDetails: ResponseData, Identifiable, Hashable {
    let id: String
    let name: String
    let email: String
}
