//
//  SignUpData.swift
//  Happ
//
//  Created by Maksymilian Galas on 19/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

struct SignUpData: RequestData {
    let name: String
    let email: String
    let password: String
}
