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
    @Published var confirmPassword: String = ""

    // MARK: Methods

    func signUp(onSuccess: @escaping () -> Void, onError: @escaping (Error) -> Void) {
    }

}
