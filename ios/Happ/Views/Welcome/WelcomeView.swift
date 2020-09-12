//
//  WelcomeView.swift
//  Happ
//
//  Created by Maksymilian Galas on 12/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct WelcomeView: View {

    @ObservedObject var viewModel: WelcomeViewModel

    var body: some View {
        VStack {
            Spacer()

            Image.logo
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(maxHeight: 160)
                .padding()
            Text("Welcome to happ")
                .font(.title)
                .fontWeight(.bold)
            Text("A tool for event organization")
                .font(.body)

            Spacer().frame(maxHeight: 50)

            TextField("Email", text: $viewModel.email)
                .defaultStyle()
                .textContentType(.emailAddress)
                .keyboardType(.emailAddress)
            SecureField("Password", text: $viewModel.password)
                .defaultStyle()

            Spacer()

            Button(action: {}) {
                Spacer()
                Text("Sign In")
                    .font(.headline)
                Spacer()
            }
            .defaultStyle(foregroundColor: .white, backgroundColor: .main)

            Button(action: {}) {
                Text("Sign Up")
                    .font(.body)
            }
            .foregroundColor(.main)
            .padding()
        }
        .padding()
    }
}

struct WelcomeView_Previews: PreviewProvider {
    static var previews: some View {
        WelcomeView(viewModel: WelcomeViewModel())
    }
}
