//
//  HappeningDetailsView.swift
//  Happ
//
//  Created by Maksymilian Galas on 17/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct HappeningDetailsView: View {

    // MARK: Properties

    let happening: Happening
    let onEdit: (Happening) -> Void = { _ in }
    let onDelete: (Happening) -> Void = { _ in }

    // MARK: Views

    var body: some View {
        ScrollView {
            VStack(spacing: 30) {
                Text(happening.name)
                    .font(.title)
                    .fontWeight(.bold)
                    .padding()
                    .background(Color.main)
                    .foregroundColor(.white)
                    .cornerRadius(10)

                VStack(spacing: 10) {
                    Text(Translation.Happening.agenda.localized)
                        .fontWeight(.bold)
                    Text(happening.agenda)
                }
                .padding()
                .background(Color.secondaryMain)
                .foregroundColor(.secondaryText)
                .cornerRadius(10)

                VStack(spacing: 10) {
                    Text(Translation.Happening.description.localized)
                        .fontWeight(.bold)
                    Text(happening.description)
                }
                .foregroundColor(.primary)

                VStack(spacing: 10) {
                    Text(Translation.Happening.organizerdescription.localized)
                        .fontWeight(.bold)
                    Text(happening.organizerDescription)
                }
                .foregroundColor(.primary)
            }
            .font(.body)
            .padding()
        }
        .navigationBarTitle("", displayMode: .inline)
    }
}

struct HappeningDetailsView_Previews: PreviewProvider {
    static var previews: some View {
        HappeningDetailsView(happening: MockData.happening)
    }
}
