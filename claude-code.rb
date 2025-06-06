# typed: false
# frozen_string_literal: true

require "language/node"

class ClaudeCode < Formula
  desc "Command line interface for Claude AI by Anthropic"
  homepage "https://www.anthropic.com"
  url "https://registry.npmjs.org/@anthropic-ai/claude-code/-/claude-code-1.0.15.tgz"
  version "1.0.15"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", "-g", "--prefix", prefix, "@anthropic-ai/claude-code@1.0.15"
  end

  test do
    system bin/"claude-code", "--help"
  end
end
