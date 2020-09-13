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
            Text(Translation.Welcome.title.localized)
                .font(.title)
                .fontWeight(.bold)
            Text(Translation.Welcome.subtitle.localized)
                .font(.body)

            Spacer().frame(maxHeight: 50)

            TextField(Translation.Welcome.email.localized, text: $viewModel.email)
                .defaultStyle()
                .textContentType(.emailAddress)
                .keyboardType(.emailAddress)
            SecureField(Translation.Welcome.password.localized, text: $viewModel.password)
                .defaultStyle()

            Spacer()

            Button(action: {}) {
                Spacer()
                Text(Translation.Welcome.signIn.localized)
                    .font(.headline)
                Spacer()
            }
            .defaultStyle(foregroundColor: .white, backgroundColor: .main)

            Button(action: {}) {
                Text(Translation.Welcome.signUp.localized)
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
