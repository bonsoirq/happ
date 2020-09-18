//
//  HappeningDetailsView.swift
//  Happ
//
//  Created by Maksymilian Galas on 17/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI
import Combine

struct HappeningDetailsView: View, ViewModelable, Errorable {

    // MARK: Properties

    @EnvironmentObject var coordinator: Coordinator

    @ObservedObject var viewModel: HappeningDetailsViewModel
    @State private var _error: IdentifableError?
    var error: Binding<IdentifableError?> { $_error }

    // MARK: Views

    @ViewBuilder
    private var shareButton: some View {
        if viewModel.isPublished {
            ShareButton(action: shareHappening)
        }
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 30) {
                Text(viewModel.name)
                    .font(.title)
                    .fontWeight(.bold)
                    .padding()
                    .background(Color.main)
                    .foregroundColor(.white)
                    .cornerRadius(10)

                VStack(spacing: 10) {
                    Text(Translation.Happening.agenda.localized)
                        .fontWeight(.bold)
                    Text(viewModel.agenda)
                }
                .padding()
                .background(Color.secondaryMain)
                .foregroundColor(.secondaryText)
                .cornerRadius(10)

                VStack(spacing: 10) {
                    Text(Translation.Happening.description.localized)
                        .fontWeight(.bold)
                    Text(viewModel.description)
                }

                VStack(spacing: 10) {
                    Text(Translation.Happening.organizerDescription.localized)
                        .fontWeight(.bold)
                    Text(viewModel.organizerDescription)
                }

                Toggle(isOn: $viewModel.isPublished.didSet(execute: setPublished)) {
                    Text(Translation.Happening.published.localized)
                }
            }
            .font(.body)
            .padding()
        }
        .navigationBarTitle("", displayMode: .inline)
        .navigationBarItems(trailing: shareButton)
        .error(error, onDismiss: onErrorDismiss)
    }

    // MARK: Methods

    private func setPublished(_ isPublished: Bool) {
        viewModel.setPublished(isPublished, onError: onError)
    }

    private func shareHappening() {
        let activityViewController = UIActivityViewController(activityItems: [viewModel.shareDescription], applicationActivities: nil)
        UIApplication.shared.windows.first?.rootViewController?.present(activityViewController, animated: true, completion: nil)
    }

}

struct HappeningDetailsView_Previews: PreviewProvider {
    static var previews: some View {
        HappeningDetailsView(viewModel: HappeningDetailsViewModel(apiRequest: APIRequestMock(), happening: MockData.happening))
            .environmentObject(Coordinator())
    }
}
