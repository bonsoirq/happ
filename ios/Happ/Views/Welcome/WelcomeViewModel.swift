//
//  WelcomeViewModel.swift
//  Happ
//
//  Created by Maksymilian Galas on 12/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI
import Combine

final class WelcomeViewModel: ViewModel, ObservableObject {

    // MARK: Properties

    @Published var email: String = ""
    @Published var password: String = ""

    var signUpViewModel: SignUpViewModel {
        SignUpViewModel(apiRequest: apiRequest)
    }

    // MARK: Methods

    func signIn(onSuccess: @escaping () -> Void, onError: @escaping (Error) -> Void) {
        let data = SignInData(email: email, password: password)
        apiRequest.signIn(data: data, onSuccess: onSuccess, onError: onError)
    }

}
