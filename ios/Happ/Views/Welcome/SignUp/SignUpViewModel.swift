//
//  SignUpViewModel.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

final class SignUpViewModel: ViewModel, ObservableObject {

    // MARK: Properties

    @Published var name: String = ""
    @Published var email: String = ""
    @Published var password: String = ""

    // MARK: Methods

    func signUp(onSuccess: @escaping () -> Void, onError: @escaping (Error) -> Void) {
        let data = SignUpData(name: name, email: email, password: password)
        apiRequest.signUp(data: data)
            .onError(onError)
            .onSuccess { [weak self] in
                self?.signIn(onSuccess: onSuccess, onError: onError)
            }
            .make()
    }

    func signIn(onSuccess: @escaping () -> Void, onError: @escaping (Error) -> Void) {
        let data = SignInData(email: email, password: password)
        apiRequest.signIn(data: data, onSuccess: onSuccess, onError: onError)
    }

}
