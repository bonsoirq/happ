//
//  AccountView.swift
//  Happ
//
//  Created by Maksymilian Galas on 16/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct AccountView: View, ViewModelable, Errorable {

    // MARK: Properties

    @EnvironmentObject var coordinator: Coordinator
    @ObservedObject var viewModel: AccountViewModel
    @State private var _error: IdentifableError?
    var error: Binding<IdentifableError?> { $_error }

    // MARK: Views
    
    var body: some View {
        List {
            Section(header: Text(Translation.Account.name.localized)) {
                Text(viewModel.name)
            }
            Section(header: Text(Translation.Account.email.localized)) {
                Text(viewModel.email)
            }
            Button(action: signOut) {
                Text(Translation.Account.signOut.localized)
            }
        }
        .listStyle(GroupedListStyle())
        .environment(\.horizontalSizeClass, .regular)
        .navigationBarTitle(Tab.account.title)
        .onAppear(perform: downloadData)
        .error(error, onDismiss: onErrorDismiss)
    }

    // MARK: Methods

    private func downloadData() {
        viewModel.downloadData(onError)
    }
    
}

struct AccountView_Previews: PreviewProvider {
    static var previews: some View {
        AccountView(viewModel: AccountViewModel(apiRequest: APIRequestMock()))
            .environmentObject(Coordinator())
    }
}
