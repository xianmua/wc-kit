import { css } from 'lit';

export const avatarStyles = css`
  :host {
    display: inline-block;

    /* component 层令牌（预设档位会覆写） */
    --wc-avatar-size: 32px;
    --wc-avatar-font-size: var(--wc-font-size-medium);
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: var(--wc-avatar-size);
    height: var(--wc-avatar-size);
    font-size: var(--wc-avatar-font-size);
    color: var(--wc-color-text);
    white-space: nowrap;
    user-select: none;
    background-color: var(--wc-color-bg-container-secondary);
  }

  .avatar.small {
    --wc-avatar-size: 24px;
    --wc-avatar-font-size: var(--wc-font-size-small);
  }

  .avatar.large {
    --wc-avatar-size: 40px;
    --wc-avatar-font-size: var(--wc-font-size-large);
  }

  .avatar.shape-circle {
    border-radius: var(--wc-radius-circle);
  }

  .avatar.shape-round {
    border-radius: var(--wc-radius-large);
  }

  .avatar.shape-square {
    border-radius: var(--wc-radius-small);
  }

  .avatar ::slotted(img) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar ::slotted(wc-icon) {
    color: var(--wc-color-text-placeholder);
  }
`;
