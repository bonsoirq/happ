//
//  CancelButton.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct CancelButton: View {
    var action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(Translation.Alert.cancel.localized)
                .font(.body)
        }
    }
}

struct CancelButton_Previews: PreviewProvider {
    static var previews: some View {
        CancelButton(action: {})
    }
}
