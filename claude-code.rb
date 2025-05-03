# typed: false
# frozen_string_literal: true

require "language/node"

class ClaudeCode < Formula
  desc "Command line interface for Claude AI by Anthropic"
  homepage "https://www.anthropic.com"
  license "MIT"

  livecheck do
    url "https://registry.npmjs.org/@anthropic-ai/claude-code/latest"
    regex(/["']version["']:\s*["']([^"']+)["']/i)
  end

  depends_on "node"

  def install
    system "npm", "install", "-g", "--prefix", prefix, "@anthropic-ai/claude-code@#{version}"
  end

  test do
    system bin/"claude-code", "--help"
  end
end