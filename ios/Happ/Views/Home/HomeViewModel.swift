//
//  HomeViewModel.swift
//  Happ
//
//  Created by Maksymilian Galas on 17/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

final class HomeViewModel: ViewModel, ObservableObject {

    // MARK: Properties

    @Published var happenings: [Happening] = []

    // MARK: Methods

    func downloadData(_ onError: @escaping (Error) -> Void) {
        apiRequest.happenings(.get)
            .onError(onError)
            .onDataSuccess { [weak self] (happenings: [Happening]?) in
                self?.happenings = happenings ?? []
            }
            .make()
    }

}
