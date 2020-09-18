//
//  AddButton.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct AddButton: View {
    var action: () -> Void
    
    var body: some View {
        Button(action: action, label: {
            Image(systemName: "plus.circle.fill")
                .resizable()
                .aspectRatio(1, contentMode: .fit)
                .foregroundColor(.main)
        })
    }
}

struct AddButton_Previews: PreviewProvider {
    static var previews: some View {
        AddButton(action: {})
    }
}
