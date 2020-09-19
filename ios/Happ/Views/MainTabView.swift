//
//  MainTabView.swift
//  Happ
//
//  Created by Maksymilian Galas on 16/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct MainTabView: View {

    // MARK: Properties

    @EnvironmentObject var coordinator: Coordinator
    @ObservedObject var viewModel: MainTabViewModel

    // MARK: Views

    var body: some View {
        TabView(selection: $viewModel.selectedTab) {
            NavigationView {
                HomeView(viewModel: viewModel.homeViewModel)
                    .environmentObject(coordinator)
            }
            .tabItem {
                Tab.home.image
                Text(Tab.home.title)
            }
            .tag(Tab.home)

            NavigationView {
                AccountView(viewModel: viewModel.accountViewModel)
                    .environmentObject(coordinator)
            }
            .tabItem {
                Tab.account.image
                Text(Tab.account.title)
            }
            .tag(Tab.account)
        }
        .accentColor(.main)
    }
}

struct TabView_Previews: PreviewProvider {
    static var previews: some View {
        MainTabView(viewModel: MainTabViewModel(apiRequest: APIRequestMock(), imageRetriever: ImageRetrieverMock()))
    }
}
