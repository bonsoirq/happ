//
//  HappeningRow.swift
//  Happ
//
//  Created by Maksymilian Galas on 17/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct HappeningRow: View {
    let happening: Happening
    let onEdit: (Happening) -> Void = { _ in }
    let onDelete: (Happening) -> Void = { _ in }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(happening.name)
                .font(.headline)
                .lineLimit(3)

            Text(happening.description)
                .lineLimit(1)
                .font(.body)
                .foregroundColor(.secondary)
        }
        .foregroundColor(.primary)
        .contextMenu {
            ContextMenuButton(.edit, action: onHappeningEdit)
            ContextMenuButton(.delete, action: onHappeningDelete)
        }
    }

    private func onHappeningEdit() {
        onEdit(happening)
    }

    private func onHappeningDelete() {
        onDelete(happening)
    }
}

struct HappeningRow_Previews: PreviewProvider {
    static var previews: some View {
        HappeningRow(happening: MockData.happening)
    }
}
