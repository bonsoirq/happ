//
//  ContextMenuButton.swift
//  Happ
//
//  Created by Maksymilian Galas on 17/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct ContextMenuButton: View {
    let type: ContextMenuItem
    let action: () -> Void

    init(_ type: ContextMenuItem, action: @escaping () -> Void) {
        self.type = type
        self.action = action
    }

    var body: some View {
        Button(action: action, label: {
            Text(type.text)
            type.image
        })
    }
}

struct ContextMenuButton_Previews: PreviewProvider {
    static var previews: some View {
        ContextMenuButton(.delete, action: {})
    }
}
