//
//  ConfirmButton.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct ConfirmButton: View {
    var action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(Translation.Alert.confirm.localized)
                .font(.headline)
        }
    }
}

struct ConfirmButton_Previews: PreviewProvider {
    static var previews: some View {
        ConfirmButton(action: {})
    }
}
