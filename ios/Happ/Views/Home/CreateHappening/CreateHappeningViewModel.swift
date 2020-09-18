//
//  CreateHappeningViewModel.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

final class CreateHappeningViewModel: ViewModel, ObservableObject {

    // MARK: Properties

    @Published var name: String = ""
    @Published var description: String = ""
    @Published var organizerDescription: String = ""
    @Published var agenda: String = ""

    // MARK: Methods

    func createHappening(onSuccess: @escaping () -> Void, onError: @escaping (Error) -> Void) {
    }

}
