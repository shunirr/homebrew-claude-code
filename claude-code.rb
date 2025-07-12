# typed: false
# frozen_string_literal: true

require "language/node"

class ClaudeCode < Formula
  desc "Command line interface for Claude AI by Anthropic"
  homepage "https://www.anthropic.com"
  url "https://registry.npmjs.org/@anthropic-ai/claude-code/-/claude-code-1.0.51.tgz"
  version "1.0.51"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    assert_match "Usage", shell_output("#{bin}/claude-code --help")
  end
end
