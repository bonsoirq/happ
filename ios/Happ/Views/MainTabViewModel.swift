//
//  MainTabViewModel.swift
//  Happ
//
//  Created by Maksymilian Galas on 16/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

final class MainTabViewModel: ViewModel, ObservableObject {

    // MARK: Properties

    @Published var selectedTab: Tab = .home

    let homeViewModel: HomeViewModel
    let accountViewModel: AccountViewModel

    // MARK: Initialization

    init(apiRequest: APIRequestable, imageRetriever: ImageRetrievable) {
        homeViewModel = HomeViewModel(apiRequest: apiRequest, imageRetriever: imageRetriever)
        accountViewModel = AccountViewModel(apiRequest: apiRequest)
        
        super.init(apiRequest: apiRequest)
    }

}
