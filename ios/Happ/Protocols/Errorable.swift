//
//  Errorable.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

protocol Errorable {
    var error: Binding<IdentifableError?> { get }
    func onError(_ error: Error)
}

extension Errorable {
    func onError(_ error: Error) {
        self.error.wrappedValue = IdentifableError(error)
    }
}
