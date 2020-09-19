//
//  ShareButton.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct ShareButton: View {
    var action: () -> Void

    var body: some View {
        Button(action: action, label: {
            Image(systemName: "square.and.arrow.up")
                .imageScale(.large)
                .foregroundColor(.main)
        })
    }
}

struct ShareButton_Previews: PreviewProvider {
    static var previews: some View {
        ShareButton(action: {})
    }
}
