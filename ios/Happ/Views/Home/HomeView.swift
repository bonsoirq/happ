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
    @State private var isCreateHappeningViewPresented: Bool = false

    // MARK: Views

    private func row(_ happening: Happening) -> some View {
        Section {
            NavigationLink(destination: HappeningDetailsView(happening: happening)) {
                HappeningRow(happening: happening, onDelete: onHappeningDelete)
            }
        }
    }

    private func createHappeningView() -> some View {
        CreateHappeningView(viewModel: viewModel.createHappeningViewModel, onDismiss: onCreateHappeningViewDismiss)
    }

    var body: some View {
        List {
            ForEach(viewModel.happenings, content: row)
        }
        .listStyle(GroupedListStyle())
        .environment(\.horizontalSizeClass, .regular)
        .navigationBarTitle(Tab.home.title)
        .navigationBarItems(trailing: AddButton(action: createHappening).frame(width: 26, height: 26))
        .sheet(isPresented: $isCreateHappeningViewPresented, content: createHappeningView)
        .onAppear(perform: downloadData)
        .error(error, onDismiss: onErrorDismiss)
    }

    // MARK: Methods

    private func downloadData() {
        viewModel.downloadData(onError)
    }

    private func onHappeningDelete(_ happening: Happening) {
        viewModel.deleteHappening(happening, onError: onError)
    }

    private func createHappening() {
        isCreateHappeningViewPresented = true
    }

    private func onCreateHappeningViewDismiss() {
        downloadData()
        isCreateHappeningViewPresented = false
    }
    
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView(viewModel: HomeViewModel(apiRequest: APIRequestMock()))
            .environmentObject(Coordinator())
    }
}
