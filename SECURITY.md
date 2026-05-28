# Security Policy

This repository hosts static documentation and example reports for the TAFFISH
RNA-seq flow family. It does not publish executable flow code itself.

## Supported Scope

- Static website source and GitHub Pages configuration: supported on `main`.
- Example report content: supported as curated demonstration material.
- Executable TAFFISH flow behavior: report issues in the relevant
  `rnaseq-*-flow` repository when possible.
- TAFFISH runtime or installer behavior: report issues in the core `taffish`
  repository.

## Reporting a Security Issue

If the issue could expose credentials, private data, unpublished biological
datasets, or unsafe execution behavior, do not include sensitive details in a
public issue.

Use GitHub private security advisories when available. If that is not available,
open a minimal public issue asking for a private maintainer contact channel and
avoid including secrets, patient data, or exploit details.

## Data Privacy

Do not attach private FASTQ/BAM/count matrices, access tokens, server paths with
secrets, or regulated clinical data to public issues. Provide small synthetic
fixtures or public accession IDs whenever possible.
