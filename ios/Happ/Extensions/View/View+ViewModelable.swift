//
//  View+ViewModelable.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

extension View where Self: ViewModelable {
    
    func onErrorDismiss(_ error: IdentifableError) {
        if error.accessTokenExpired {
            signOut()
        }
    }
    
    func signOut() {
        viewModel.signOut(onSignOut: coordinator.refresh)
    }
    
}
