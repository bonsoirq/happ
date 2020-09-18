//
//  CreateButton.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct CreateButton: View {
    var action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(Translation.Common.create.localized)
                .font(.headline)
        }
    }
}

struct CreateButton_Previews: PreviewProvider {
    static var previews: some View {
        CreateButton(action: {})
    }
}
