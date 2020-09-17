//
//  HomeView.swift
//  Happ
//
//  Created by Maksymilian Galas on 17/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct HomeView: View, ViewModelable, Errorable {

    // MARK: Properties

    @EnvironmentObject var coordinator: Coordinator
    @ObservedObject var viewModel: HomeViewModel
    @State private var _error: IdentifableError?
    var error: Binding<IdentifableError?> { $_error }

    // MARK: Views

    var body: some View {
        List(viewModel.happenings, rowContent: HappeningRow.init)
            .listStyle(GroupedListStyle())
            .environment(\.horizontalSizeClass, .regular)
            .navigationBarTitle(Tab.home.title)
            .onAppear(perform: downloadData)
            .error(error, onDismiss: onErrorDismiss)
    }

    // MARK: Methods

    private func downloadData() {
        viewModel.downloadData(onError)
    }
    
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView(viewModel: HomeViewModel(apiRequest: APIRequestMock()))
            .environmentObject(Coordinator())
    }
}
