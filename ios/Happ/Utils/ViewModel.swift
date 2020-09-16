//
//  ViewModel.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

class ViewModel {
    let apiRequest: APIRequestable
    
    init(apiRequest: APIRequestable) {
        self.apiRequest = apiRequest
    }
    
    func signOut(onSignOut: @escaping () -> Void) {
        apiRequest.clearTokens()
        onSignOut()
    }
}
