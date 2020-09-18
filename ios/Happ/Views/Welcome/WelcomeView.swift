//
//  WelcomeView.swift
//  Happ
//
//  Created by Maksymilian Galas on 12/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct WelcomeView: View, Errorable {

    // MARK: Properties

    @EnvironmentObject var coordinator: Coordinator
    @ObservedObject var viewModel: WelcomeViewModel
    @State private var _error: IdentifableError?
    var error: Binding<IdentifableError?> { $_error }

    @State var isSignUpViewPresented: Bool = false

    // MARK: Views

    private func signUpView() -> some View {
        SignUpView(viewModel: viewModel.signUpViewModel)
    }

    var body: some View {
        VStack {
            Spacer()

            Image.logo
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(maxHeight: 160)
                .padding()
            Text(Translation.Welcome.title.localized)
                .font(.title)
                .fontWeight(.bold)
            Text(Translation.Welcome.subtitle.localized)
                .font(.body)

            Spacer().frame(maxHeight: 50)

            TextField(Translation.Welcome.email.localized, text: $viewModel.email)
                .defaultStyle()
                .autocapitalization(.none)
                .textContentType(.emailAddress)
                .keyboardType(.emailAddress)
            SecureField(Translation.Welcome.password.localized, text: $viewModel.password)
                .defaultStyle()

            Spacer()

            Button(action: signIn) {
                Spacer()
                Text(Translation.Welcome.signIn.localized)
                    .font(.headline)
                Spacer()
            }
            .defaultStyle(foregroundColor: .white, backgroundColor: .main)

            Button(action: signUp) {
                Text(Translation.Welcome.signUp.localized)
                    .font(.body)
            }
            .foregroundColor(.main)
            .padding()
        }
        .padding()
        .keyboardAdaptive()
        .sheet(isPresented: $isSignUpViewPresented, content: signUpView)
        .error(error)
    }

    // MARK: Methods

    private func signIn() {
        viewModel.signIn(onSuccess: coordinator.refresh, onError: onError)
    }

    private func signUp() {
        isSignUpViewPresented = true
    }
}

struct WelcomeView_Previews: PreviewProvider {
    static var previews: some View {
        WelcomeView(viewModel: WelcomeViewModel(apiRequest: APIRequestMock()))
            .environmentObject(Coordinator())
    }
}
