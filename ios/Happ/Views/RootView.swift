//
//  RootView.swift
//  Happ
//
//  Created by Maksymilian Galas on 12/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct RootView: View {

    // MARK: Properties

    @EnvironmentObject var coordinator: Coordinator
    let apiRequest: APIRequestable

    // MARK: Views

    var body: some View {
        ZStack {
            if apiRequest.tokens == nil {
                WelcomeView(viewModel: WelcomeViewModel(apiRequest: apiRequest))
                    .environmentObject(coordinator)
                    .transition(.move(edge: .bottom))
            } else {
                MainTabView(viewModel: MainTabViewModel(apiRequest: apiRequest))
            }
        }
    }
    
}

struct RootView_Previews: PreviewProvider {
    static var previews: some View {
        RootView(apiRequest: APIRequestMock())
            .environmentObject(Coordinator())
    }
}
