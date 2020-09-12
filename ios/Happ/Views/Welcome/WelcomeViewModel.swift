//
//  WelcomeViewModel.swift
//  Happ
//
//  Created by Maksymilian Galas on 12/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI
import Combine

final class WelcomeViewModel: ObservableObject {

    // MARK: Properties

    @Published var email: String = ""
    @Published var password: String = ""

    // MARK: Methods

    func login(onSuccess: @escaping () -> Void, onError: @escaping (Error) -> Void) { }

}
