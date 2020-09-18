//
//  CreateHappeningView.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct CreateHappeningView: View, ViewModelable, Errorable {

    // MARK: Properties

    @EnvironmentObject var coordinator: Coordinator
    @ObservedObject var viewModel: CreateHappeningViewModel
    @State private var _error: IdentifableError?
    var error: Binding<IdentifableError?> { $_error }
    var onDismiss: () -> Void

    // MARK: Views

    var body: some View {
        NavigationView {
            Form {
                Section(header: Text(Translation.CreateHappening.name.localized)) {
                    TextField("", text: $viewModel.name)
                }
                Section(header: Text(Translation.CreateHappening.description.localized)) {
                    TextView(text: $viewModel.description)
                        .frame(height: 200)
                }
                Section(header: Text(Translation.CreateHappening.organizerdescription.localized)) {
                    TextView(text: $viewModel.organizerDescription)
                        .frame(height: 200)
                }
                Section(header: Text(Translation.CreateHappening.agenda.localized)) {
                    TextView(text: $viewModel.agenda)
                        .frame(height: 200)
                }
            }
            .keyboardAdaptive()
            .environment(\.horizontalSizeClass, .regular)
            .navigationBarTitle(Text(Translation.CreateHappening.title.localized), displayMode: .inline)
            .navigationBarItems(leading: CancelButton(action: onCancel),
                                trailing: CreateButton(action: createHappening))
        }
        .error(error, onDismiss: onErrorDismiss)
    }

    // MARK: Methods

    private func createHappening() {
        viewModel.createHappening(onSuccess: onDismiss, onError: onError)
    }

    private func onCancel() {
        onDismiss()
    }

}

struct CreateHappeningView_Previews: PreviewProvider {
    static var previews: some View {
        CreateHappeningView(viewModel: CreateHappeningViewModel(apiRequest: APIRequestMock()), onDismiss: {})
            .environmentObject(Coordinator())
    }
}
