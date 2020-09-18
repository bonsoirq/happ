//
//  SignUpView.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct SignUpView: View, Errorable {

    // MARK: Properties

    @EnvironmentObject var coordinator: Coordinator
    @Environment(\.presentationMode) var presentationMode

    @ObservedObject var viewModel: SignUpViewModel
    @State private var _error: IdentifableError?
    var error: Binding<IdentifableError?> { $_error }

    // MARK: Views

    var body: some View {
        VStack {
            Spacer()

            Image.logo
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(maxHeight: 160)
                .padding()
            Text(Translation.SignUp.title.localized)
                .font(.title)
                .fontWeight(.bold)

            Spacer().frame(maxHeight: 50)

            VStack {

                TextField(Translation.SignUp.name.localized, text: $viewModel.name)
                    .defaultStyle()

                TextField(Translation.SignUp.email.localized, text: $viewModel.email)
                    .defaultStyle()
                    .autocapitalization(.none)
                    .textContentType(.emailAddress)
                    .keyboardType(.emailAddress)

                SecureField(Translation.SignUp.password.localized, text: $viewModel.password)
                    .defaultStyle()
            }

            Spacer()

            Button(action: signUp) {
                Spacer()
                Text(Translation.SignUp.signUp.localized)
                    .font(.headline)
                Spacer()
            }
            .defaultStyle(foregroundColor: .white, backgroundColor: .main)

            Button(action: dismiss) {
                Text(Translation.Alert.cancel.localized)
                    .font(.body)
            }
            .foregroundColor(.main)
            .padding()
        }
        .padding()
        .keyboardAdaptive()
        .error(error)
    }

    // MARK: Methods

    private func signUp() {
        viewModel.signUp(onSuccess: coordinator.refresh, onError: onError)
    }

    private func dismiss() {
        presentationMode.wrappedValue.dismiss()
    }
}

struct SignUpView_Previews: PreviewProvider {
    static var previews: some View {
        SignUpView(viewModel: SignUpViewModel(apiRequest: APIRequestMock()))
            .environmentObject(Coordinator())
    }
}
