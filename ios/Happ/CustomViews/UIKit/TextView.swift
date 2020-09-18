//
//  TextView.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct TextView: UIViewRepresentable {
    var placeholder: String = ""
    @Binding var text: String {
        didSet {
            placeholderLabel.isHidden = !text.isEmpty
        }
    }

    private let placeholderLabel = UILabel()

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    func makeUIView(context: Context) -> UITextView {
        let textView = UITextView()
        textView.isScrollEnabled = true
        textView.isEditable = true
        textView.isUserInteractionEnabled = true
        textView.backgroundColor = .clear
        textView.font = .preferredFont(forTextStyle: .body)
        textView.textContainer.lineBreakMode = .byWordWrapping
        textView.textContainerInset = UIEdgeInsets(top: textView.textContainerInset.top, left: -5,
                                                   bottom: textView.textContainerInset.bottom, right: 0)
        textView.text = text

        placeholderLabel.text = placeholder
        placeholderLabel.font = textView.font
        placeholderLabel.sizeToFit()
        textView.addSubview(placeholderLabel)
        placeholderLabel.frame.origin = CGPoint(x: 0, y: (textView.font?.pointSize)! / 2)
        placeholderLabel.textColor = .tertiaryLabel
        placeholderLabel.isHidden = !textView.text.isEmpty

        return textView
    }

    func updateUIView(_ textView: UITextView, context: Context) {
        textView.delegate = context.coordinator
        textView.setContentHuggingPriority(.defaultHigh, for: .horizontal)
        textView.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)
    }

    final class Coordinator: NSObject, UITextViewDelegate {
        let textView: TextView

        init(_ textView: TextView) {
            self.textView = textView
        }

        func textViewDidChange(_ textView: UITextView) {
            self.textView.text = textView.text ?? ""
        }
    }
}

struct TextView_Previews: PreviewProvider {
    static var previews: some View {
        TextView(placeholder: "Placeholder", text: .constant("Text"))
    }
}
