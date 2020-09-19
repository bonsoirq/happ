//
//  AccountViewModel.swift
//  Happ
//
//  Created by Maksymilian Galas on 16/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

final class AccountViewModel: ViewModel, ObservableObject {

    // MARK: Properties

    @Published var name: String = ""
    @Published var email: String = ""

    // MARK: Methods

    func downloadData(_ onError: @escaping (Error) -> Void) {
        apiRequest.account(.details).onDataSuccess { [weak self] (accountDetails: AccountDetails?) in
            guard let accountDetails = accountDetails else { return }
            self?.name = accountDetails.name
            self?.email = accountDetails.email
        }.onError(onError).make()
    }

}
